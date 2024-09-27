import { test, expect } from '@playwright/test';
import { ProductPage, type ProductInfo } from '../page-objects/ProductPage';
import * as fs from 'fs';

test('Obtener datos de productos de todas las páginas disponibles', async ({ page }) => {
  const productPage = new ProductPage(page);

  await test.step('Navegar a la página de productos', async () => {
    await productPage.goto();
  });

  let allProducts: ProductInfo[] = [];
  let pageNumber = 1;
  let previousProductCount = 0;

  await test.step('Recopilar información de productos de todas las páginas', async () => {
    while (true) {
      await test.step(`Obtener productos de la página ${pageNumber}`, async () => {
        const products = await productPage.getProductsInfo();
        allProducts = [...allProducts, ...products];
        
        // Verifica que se hayan obtenido productos en esta página
        expect(products.length).toBeGreaterThan(0);
      });
      
      if (await productPage.hasNextPage() && allProducts.length > previousProductCount) {
        await test.step(`Navegar a la página siguiente (${pageNumber + 1})`, async () => {
          previousProductCount = allProducts.length;
          await productPage.goToNextPage();
          pageNumber++;
        });
      } else {
        break;
      }
    }
  });

  await test.step('Guardar productos en un archivo', async () => {
    fs.writeFileSync('products.txt', JSON.stringify(allProducts, null, 2));
    console.log('Todos los productos:', allProducts.length);
  });

  await test.step('Verificar que se hayan recuperado productos', async () => {
    expect(allProducts.length).toBeGreaterThan(0);
  });
});