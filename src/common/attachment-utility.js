//10MB
const MAX_PHOTO_SIZE_BYTES = 10485760;
const JPG_QUALITY = 0.7;
const MAX_BORDER_SIZE = 800;

function imageToResizedBase64(img, jpqQuality, mimeType, maxBorderSize) {
    let maxWidth = maxBorderSize;
    let maxHeight = maxBorderSize;
    let canvas = document.createElement('canvas');

    let width = img.width;
    let height = img.height;

    if (width > height) {
        if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
        }
    }

    let ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    let fileRes = canvas.toDataURL(mimeType, jpqQuality);
    return fileRes;
}

export function loadFileToAttachmentObject(resolve, file) {
    let reader = new FileReader();
    reader.onload = () => resolve({name: file.name, content: reader.result, url: URL.createObjectURL(file)});
    reader.readAsDataURL(file);
}

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
    if(file) {
        return compressPhoto(file, JPG_QUALITY, MAX_BORDER_SIZE);
    }
    return null;
}

export function validateFile(file) {
    const attachmentSize = attachmentSizeInB(file.content);
    if (attachmentSize > MAX_PHOTO_SIZE_BYTES) {
        throw new Error('validations.file.tooBig');
    }
    if (!isPhotoAttachment(file.name)) {
        throw new Error('validations.file.wrongExtension');
    }
    return file
}

function convertToImage(url) {
    return new Promise(resolve => {
        let image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
    });
}

async function compressPhoto(photo, jpgQuality, maxBorderSize) {
    let sourcePhotoSize = attachmentSizeInB(photo.content);
    console.log('Attachment size (B) before compression: ' + sourcePhotoSize);
    const image = await convertToImage(photo.url);
    //example base64 encoded file="data:image/jpeg;base64,{content}"
    const mimeType = photo.content.substring(photo.content.indexOf(':') + 1, photo.content.indexOf(';'));
    const compressedContent = imageToResizedBase64(image, jpgQuality, mimeType, maxBorderSize);
    const compressedContentSize = attachmentSizeInB(compressedContent);

    photo.content = compressedContent;
    photo = initializeAttachmentFromBase64(photo);

    console.log('Attachment size (B) after compression: ' + compressedContentSize);
    return photo;
}

function attachmentSizeInB(base64src) {
    //the file size is 75% of the size of the base64 string (this is not an exact factor)
    let base64StringToFileSizeRatio = 0.75;
    //example base64 encoded file="data:image/jpeg;base64,{content}"
    let base64Length = base64src.length - (base64src.indexOf(',') + 1);
    let padding = (base64src.charAt(base64src.length - 2) === '=') ? 2 : ((base64src.charAt(base64src.length - 1) === '=') ? 1 : 0);
    return base64Length * base64StringToFileSizeRatio - padding;
}

function isPhotoAttachment(attachmentName) {
    return ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'tif'].some(
        ext => attachmentName.toLowerCase().endsWith(ext));
}
