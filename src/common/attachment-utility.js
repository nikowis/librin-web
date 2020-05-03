export function loadFileToAttachmentObject(resolve, file) {
    let reader = new FileReader();
    reader.onload = () => resolve({name: file.name, content: reader.result, url: URL.createObjectURL(file)});
    reader.readAsDataURL(file);
};

export function base64ToFile(base64, filename) {
    var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
}

export function initializeAttachmentFromBase64(attachment) {
    const file = base64ToFile(attachment.content, attachment.name);
    return {name: attachment.name, content: attachment.content, url: URL.createObjectURL(file)}
}


export function compressFile(file) {
    return file
}

export function validateFile(file) {
    return file
}
