export function appendIfExists(
    formData: FormData,
    key: string,
    value?: string | Blob
  ): void {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  }