import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import { config } from "../config";

const { name, password } = config.existingUser;

test("Probar login de usuario", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step("Navegar a la pagina", async () => {
    await loginPage.goto();
  });

  await test.step("Click en el boton de login", async () => {
    await loginPage.loginLink.click();
  });

  await test.step("Logueo con los datos del usuario", async () => {
    await loginPage.login(name, password);
    await loginPage.loginButton.click();
  });

  await test.step("Validar que el usuario se haya logueado correctamente", async () => {
    await expect(loginPage.welcomeMessage).toBeVisible();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshot-login.png" });
    await page.close();
  });
});
