<template id="page-type">
    <body>
        <header class="wrapper-titre">
                <h1>
                    <span>{{ uiParams.titrePageEcran }}</span>
                </h1>
        </header>

        <header class="wrapper-sous-titre">
                <p class="p1">
                    <span>TeleCoop vous accompagne pour conserver votre mobile le plus longtemps possible.</span> <span>{{ uiParams.soustitrePageEcran }}</span>
                </p>
        </header>

        <footer class="footer">
            <div class="wrapper-footer">
                <span>BONNES PRATIQUES</span>
            </div>
            <div>
                <span>sssssssssssss</span>
            </div>
        </footer>
    </body>

</template>

<script setup>
    import uiParams from '@/config/uiParams';
</script>