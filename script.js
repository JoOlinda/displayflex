document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todas as seções que queremos observar e todos os links da navegação
    const sections = document.querySelectorAll('.explanation-section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Converte a NodeList de links em um Map para acesso rápido. Ex: 'prop-direction' -> <a> element
    const navLinkMap = new Map();
    navLinks.forEach(link => {
        const hash = link.getAttribute('href');
        navLinkMap.set(hash.substring(1), link); // Remove o '#' do href para usar como chave
    });

    // Opções para o Intersection Observer
    // rootMargin: ajusta a "caixa" de intersecção. -40% no topo significa que a seção
    // só será considerada "ativa" quando 40% dela já tiver passado do topo da tela.
    // Isso evita que o link mude muito cedo.
    const observerOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: '-40% 0px -60% 0px', // [top, right, bottom, left]
        threshold: 0 // Dispara assim que qualquer parte do elemento entra na margem
    };

    // Função que será chamada quando uma seção entrar ou sair da área de observação
    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove as classes ativas de todos os links e seções
                navLinks.forEach(link => link.classList.remove('active'));
                sections.forEach(section => section.classList.remove('section-active'));

                // Adiciona a classe ativa ao link e à seção correspondente
                const activeLink = navLinkMap.get(entry.target.id);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                entry.target.classList.add('section-active');
            }
        });
    };

    // Cria e inicia o observador para cada seção
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    sections.forEach(section => observer.observe(section));
});