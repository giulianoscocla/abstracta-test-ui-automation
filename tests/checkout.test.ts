import { test, expect } from "@playwright/test";
import {
  CheckoutPage,
  type checkoutDetails,
} from "../page-objects/CheckoutPage";

test("Proceso de compra en Demoblaze ecommerce", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await test.step("Navegar a la pagina de productos", async () => {
    await checkoutPage.goto();
  });

  await test.step("Seleccionar un producto", async () => {
    await checkoutPage.toBuyProduct.click();
  });

  await test.step("Agregar al carrito de compra", async () => {
    // Configurar el manejo del diálogo antes de hacer clic
    const dialogPromise = page.waitForEvent('dialog');
    
    await checkoutPage.addToCartButton.click();
    
    // Esperar y manejar el diálogo
    const dialog = await dialogPromise;
    console.log(`Mensaje del diálogo: ${dialog.message()}`);
    await dialog.dismiss();

    await checkoutPage.cartLink.click();
    await checkoutPage.placeOrderButton.click();
  });

  await test.step("Completar compra", async () => {
    const userData: checkoutDetails = {
      name: "Nahuel",
      country: "Uruguay",
      city: "Montevideo",
      card: "9999",
      month: "10",
      year: "2024",
    };

    await checkoutPage.fillCheckoutDetails(userData);

    await checkoutPage.purchaseButton.click();
    await page.waitForTimeout(1000);
    await expect(checkoutPage.thanksMessage).toBeVisible();
    await page.screenshot({ path: "screenshot-after-purchase.png" });
    await page.close();
  });
});
