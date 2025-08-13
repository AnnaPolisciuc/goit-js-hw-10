import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');

form.addEventListener('submit', event => {
    event.preventDefault();
    console.log('Форма отправлена'); 

    const delay = Number(delayInput.value);
    const selectedState = form.querySelector('input[name="state"]:checked');

    if (!selectedState) {
        console.warn('Не выбран state!');
        return;
    }

    console.log(`Delay: ${delay}, State: ${selectedState.value}`);

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedState.value === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then((delay) => {
            console.log('success', delay);
            iziToast.success({
                title: '✔ OK',
                message: `Fulfilled promise in ${delay}ms`,
                icon: 'icon-check',
                position: 'topRight',
            });
        })
        .catch((delay) => {
            console.log('error', delay);
            iziToast.error({
                title: '❌ Error',
                message: `Rejected promise in ${delay}ms`,
                icon: 'icon-close',
                position: 'topRight',
            });
        });
});

