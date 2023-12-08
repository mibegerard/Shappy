<?php

    // Database connection parameters
    $host = "localhost";
    $username = "root";
    $password = "";
    $database = "shappy";

    // Create a database connection
    $conn = new mysqli($host, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get form data
        $name = $_POST["name"];
        $email = $_POST["email"];
        $telephone = $_POST["telephone"];
        $subject = $_POST["subject"];
        $message = $_POST["message"];

        // Output form data for debugging (you can remove this later)
        echo "Name: $name<br>";
        echo "Email: $email<br>";
        echo "Telephone: $telephone<br>";
        echo "Subject: $subject<br>";
        echo "Message: $message<br>";

        // Insert data into the database
        $sql = "INSERT INTO form (name, email, telephone, subject, message) VALUES ('$name', '$email', '$telephone', '$subject', '$message')";

        if ($conn->query($sql) === TRUE) {
            echo "Record added successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    // Close the database connectionS
    $conn->close();

?>
