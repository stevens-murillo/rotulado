let permission = await Notification.requestPermission();

export async function notificacion(message) {
    // create and show the notification
    const showNotification = () => {
        // create a new notification
        const notification = new Notification('Alerta', {
            body: message,
            icon: '../image/Logo.jpg'
        });

        // close the notification after 10 seconds
        setTimeout(() => {
            notification.close();
        }, 10 * 1000);

        // navigate to a URL when clicked
        // notification.addEventListener('click', () => {

        //     window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
        // });
    }

    // show an error message
    const showError = () => {
        const error = document.querySelector('.error');
        error.style.display = 'block';
        error.textContent = 'Tienes bloqueadas las notificaciones';
    }

    // check notification permission
    let granted = false;

    if (Notification.permission === 'granted') {
        granted = true;
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission();
        granted = permission === 'granted' ? true : false;
    }

    // show notification or error
    granted ? showNotification() : showError();

};