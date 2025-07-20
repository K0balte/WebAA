module com.example.p6webarchi {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.controlsfx.controls;
    requires com.dlsc.formsfx;
    requires org.kordamp.bootstrapfx.core;

    opens com.example.p6webarchi to javafx.fxml;
    exports com.example.p6webarchi;
}