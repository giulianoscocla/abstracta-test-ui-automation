<b>Automatización de UI para Ecommerce</b> </br>
</br>
Este proyecto es una solución de automatización usando Playwright para el sitio de pruebas Product Store (Demoblaze).</br>
Incluye la recolección de información de productos y la simulación de una compra.</br>
También se agregaron casos de prueba adicionales para registro e inicio de sesión de usuarios.</br>
Este proyecto sigue el patrón Page Object Model.</br>
</br>
Extracción de Información de Productos</br>
Obtiene nombres, precios y enlaces de productos de las primeras 2 páginas</br>
Guarda los datos en un archivo de texto</br>
 </br>
Automatización de Flujo de Compra</br>
Simula la compra de un producto en la tienda</br>
 </br>
Casos de Prueba Adicionales</br>
Registro de Usuario</br>
Inicio de Sesión</br>
</br>
Instalación</br>
Clona el repo git clone https://github.com/giulianoscocla/abstracta-test-ui-automation/tree/main </br>
cd carpeta-del-repo </br>
</br>
Instala dependencias y playwright </br>
npm install </br>
npx playwright </br>
</br>
Ejecución de pruebas y visualización de reportes </br>
npx playwright test </br>
npx playwright show-report </br>
