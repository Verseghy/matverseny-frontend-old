const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

const isAllowedMimeType = (base64Image: string): boolean => {
  const mimeTypeWithData = base64Image.split(';', 1)[0]
  const mimeType = mimeTypeWithData.substr(5)
  return allowedMimeTypes.includes(mimeType)
}

export enum ProcessFileError {
  NOT_ALLOWED,
  LARGE_SIZE,
}

export const processFile = (fileBlob: Blob): Promise<string> =>
  new Promise(async (resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64Image = reader.result!.toString()

      if (!isAllowedMimeType(base64Image)) reject(ProcessFileError.NOT_ALLOWED)

      if (base64Image.length > 1048576) {
        reject(ProcessFileError.LARGE_SIZE)
      }

      resolve(base64Image)
    }

    reader.readAsDataURL(fileBlob)
  })
