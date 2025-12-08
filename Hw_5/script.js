(function() {
    let apps = document.querySelectorAll(".app");

    for (let app of apps) {
        let appForm = app.querySelector('.app__form');
        let frm = app.querySelector("form");
        let list = app.querySelector("ul");
        let editingfItem = null;

        let newtaskBtn = app.querySelector('[data-action = newtask]');
        newtaskBtn.addEventListener('click', e => {
            appForm.classList.add('app__form--visible');
            appForm.querySelector('button[type=submit]').textContent = 'Сохранить';
            frm.reset();
            editingfItem = null;
        });

        let cancelBtn = app.querySelector('[data-action=cancelForm]');
        cancelBtn.addEventListener('click', e => {
            appForm.classList.remove('app__form--visible');
            frm.reset();
            editingfItem = null;
        });

        let delAction = e => {
            let li = e.target.closest('li');
            li.remove();
        };

        let editAction = e => {
            let li = e.target.closest('li');
            editingfItem = li;
            frm.reset();
            frm.description.value = li.querySelector('.description').textContent;
            appForm.classList.add('app__form--visible');
            appForm.querySelector('button[type=submit]').textContent = 'Изменить';
            frm.hiprio.checked = li.querySelector('.prio').classList.contains('prio--hiprio');
        };

        let template = list.firstElementChild;
        template.remove();
        template.removeAttribute('hidden');
        template.style.display = '';

        frm.addEventListener('submit', e => {
            e.preventDefault();
            if (frm.description.value) {
                let item = editingfItem || template.cloneNode(true);
                item.querySelector('.description').textContent = frm.description.value;
                item.querySelector('.prio').classList.toggle('prio--hiprio', frm.hiprio.checked);
                if (!editingfItem) {
                    let delBtn = item.querySelector('[data-action=delete]');
                    delBtn.addEventListener('click', delAction);

                    let editBtn = item.querySelector('[data-action=edit]');
                    editBtn.addEventListener('click', editAction);
                    list.append(item);
                }
                
                appForm.classList.remove('app__form--visible');

                setTimeout(function () {
                    frm.reset();
                }, 300);
                editingfItem = null;
            }
        });
    }
})();