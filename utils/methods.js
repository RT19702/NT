function showToast(title, icon = 'none', duration = 2000, mask = true) {
    uni.showToast({
        title: title,
        icon: icon,
        duration: duration,
        mask
    });
}

export {
    showToast
}