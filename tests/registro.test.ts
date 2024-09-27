import { test, expect } from "@playwright/test";
import { RegisterPage } from "../page-objects/RegisterPage";
import { config } from "../config";

test("Probar registro de usuario", async ({ page, browserName }) => {
  const registerPage = new RegisterPage(page);
  const { name, password } = config.getNewUser();
  let dialogMessage = "";

  // Configurar el manejador de diálogos antes de cualquier acción
  page.on("dialog", async (dialog) => {
    console.log(`Diálogo detectado: ${dialog.message()}`);
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  await test.step("Navegar a la pagina", async () => {
    await registerPage.goto();
    await page.waitForLoadState('networkidle');
  });

  await test.step("Registro de usuario", async () => {
    await registerPage.registerLink.click();
    await registerPage.register(name, password);
  });

  await test.step("Validar el resultado del registro", async () => {
    // Espera adicional para asegurar que el diálogo se muestre en firefox
    if (browserName === 'firefox') {
      await page.waitForTimeout(3000);
    } else {
      await page.waitForTimeout(1500);
    }

    console.log(`Navegador: ${browserName}`);
    console.log(`URL actual: ${page.url()}`);
    console.log(`Contenido del diálogo: "${dialogMessage}"`);

    if (dialogMessage === "Sign up successful.") {
      expect(dialogMessage).toBe("Sign up successful.");
      console.log("El usuario se registró correctamente");
    } else if (dialogMessage === "This user already exist.") {
      expect(dialogMessage).toBe("This user already exist.");
      console.log("El usuario ya existe");
    } else if (dialogMessage === "") {
      console.log("Se recibió un diálogo vacío, esperando un poco más...");
      await page.waitForTimeout(2000);
      throw new Error("No se recibió ningún mensaje de diálogo");
    } else {
      throw new Error(`Mensaje de diálogo inesperado: ${dialogMessage}`);
    }

    await page.screenshot({ path: `screenshot-registro.png` });
    await page.close();
  });
});
