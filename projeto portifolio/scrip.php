<?php
// db.php - Conexão com o banco de dados
$host = 'localhost';
$dbname = 'portifolio';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Erro na conexão: " . $e->getMessage()]));
}
?><?php
// Funções para reutilização
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function respond_json($status, $message) {
    echo json_encode([$status => $message]);
    exit;
}
?><?php
// register.php - Cadastro de usuários
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = sanitize_input($_POST['nomeUser']);
    $email = filter_var($_POST['emailUser'], FILTER_SANITIZE_EMAIL);
    $senha = $_POST['senha'];
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond_json("error", "E-mail inválido.");
    }
    if (strlen($senha) < 6) {
        respond_json("error", "A senha deve ter pelo menos 6 caracteres.");
    }
    
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO cadastroUser (nomeUser, emailUser, senha) VALUES (?, ?, ?)");
        $stmt->execute([$nome, $email, $senha_hash]);
        respond_json("success", "Cadastro realizado com sucesso!");
    } catch (PDOException $e) {
        respond_json("error", "Erro ao cadastrar: " . $e->getMessage());
    }
}
?><?php
// login.php - Autenticação de usuários
require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = filter_var($_POST['emailUser'], FILTER_SANITIZE_EMAIL);
    $senha = $_POST['senha'];
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond_json("error", "E-mail inválido.");
    }
    
    $stmt = $pdo->prepare("SELECT * FROM cadastroUser WHERE emailUser = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($senha, $user['senha'])) {
        $_SESSION['user_id'] = $user['codUser'];
        respond_json("success", "Login realizado com sucesso!");
    } else {
        respond_json("error", "Email ou senha incorretos!");
    }
}
?><?php
// portfolio.php - Criação de portfólio
require 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    respond_json("error", "Acesso negado!");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $titulo = sanitize_input($_POST['tituloImg']);
    $descricao = sanitize_input($_POST['descricao']);
    $categoria = sanitize_input($_POST['categoria']);
    $user_id = $_SESSION['user_id'];
    
    try {
        $stmt = $pdo->prepare("INSERT INTO AnexarImg (nomeAutor, tituloImg, categoria, descricao) VALUES (?, ?, ?, ?)");
        $stmt->execute([$user_id, $titulo, $categoria, $descricao]);
        respond_json("success", "Portfólio criado com sucesso!");
    } catch (PDOException $e) {
        respond_json("error", "Erro ao criar portfólio: " . $e->getMessage());
    }
}
?><?php
// upload.php - Cadastro e anexo de imagens
require 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    respond_json("error", "Acesso negado!");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['imagem'])) {
    $nomeAutor = $_SESSION['user_id'];
    $titulo = sanitize_input($_POST['tituloImg']);
    $categoria = sanitize_input($_POST['categoria']);
    $descricao = sanitize_input($_POST['descricao']);
    
    $target_dir = "uploads/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $file_name = basename($_FILES["imagem"]["name"]);
    $file_size = $_FILES["imagem"]["size"];
    $file_tmp = $_FILES["imagem"]["tmp_name"];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $allowed_ext = ['jpg', 'jpeg', 'png', 'gif'];
    
    if (!in_array($file_ext, $allowed_ext)) {
        respond_json("error", "Formato de imagem inválido. Use JPG, PNG ou GIF.");
    }
    if ($file_size > 2 * 1024 * 1024) { // 2MB
        respond_json("error", "A imagem deve ter no máximo 2MB.");
    }
    
    $new_file_name = uniqid("img_") . "." . $file_ext;
    $target_file = $target_dir . $new_file_name;
    
    if (move_uploaded_file($file_tmp, $target_file)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO AnexarImg (nomeAutor, tituloImg, categoria, descricao, pathImg) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$nomeAutor, $titulo, $categoria, $descricao, $target_file]);
            respond_json("success", "Imagem enviada com sucesso!");
        } catch (PDOException $e) {
            respond_json("error", "Erro ao salvar imagem: " . $e->getMessage());
        }
    } else {
        respond_json("error", "Erro no upload da imagem.");
    }
}
?>