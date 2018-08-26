(function() {
    function throttle(func) {
        let timer = null;
        return function() {
            if (timer === null) {
                timer = setTimeout(() => {
                    func();
                    timer = null;
                }, 30);
            }
        };
    }

    var sections = Array.from(document.querySelectorAll('#main, #main :not(.container-overview) > [id]'));
    var reverseOffsets = sections.map(function(s) { return s.offsetTop; }).reverse();
    var active = {};
    var lastPathFragment = location.pathname.split('/').pop();

    function activateSection(section) {
        if (active.menuItem) {
            active.menuItem.classList.remove('isActive');
        }

        var menuItem;
        if (section.id === 'main') {
            menuItem = document.querySelector('nav a[href$="' + lastPathFragment + '"]');
        } else {
            menuItem = document.querySelector('nav a[href$="' + lastPathFragment + '#' + section.id + '"]');
        }

        menuItem.classList.add('isActive');
        menuItem.scrollIntoView({
            behaior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
        });
        active = {
            section: section,
            menuItem: menuItem
        };
    }

    function detectSectionChange() {
        var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        var activeIdx = reverseOffsets.findIndex(function(offsetTop) {
            return (offsetTop - 1) <= scrollPosition;
        });

        if (activeIdx === -1) {
            activeIdx = sections.length;
        }

        var sectionIdx = sections.length - activeIdx;
        var section = sections[sectionIdx - 1];

        if (section && (active.section !== section)) {
            activateSection(section);
        }
    }

    detectSectionChange();

    window.addEventListener('scroll', throttle(detectSectionChange));
}());