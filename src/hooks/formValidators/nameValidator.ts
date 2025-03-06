export function nameValidator(name: string): boolean {
    // Name should only contain alphabets and be at least 2 characters long
    const nameRegex = /^[A-Za-z]{2,}$/;
    return nameRegex.test(name);
  }
  