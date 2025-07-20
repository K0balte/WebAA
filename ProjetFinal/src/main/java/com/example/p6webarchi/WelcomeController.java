package com.example.p6webarchi;

import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class WelcomeController {

    @FXML
    private Label messageLabel;

    @FXML
    protected void handleGreetButtonClick() {
        messageLabel.setText("Bienvenue dans l'application JavaFX!");
    }
}
