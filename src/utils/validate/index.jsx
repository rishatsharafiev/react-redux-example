export const required = (value) => {
  if (value instanceof Array) {
    return value.length ? undefined : 'Обязательное поле'
  } else if (value instanceof Array) {
    return Object.keys(value).length ? undefined : 'Обязательное поле'
  }
  return value ? undefined : 'Обязательное поле'
}

export const maxLength = max => value =>
  (value && value.length > max ? `Должно быть ${max} символов или менее` : undefined)

export const minLength = min => value =>
  (value && value.length < min ? `Должно быть ${min} символов или более` : undefined)

export const length = size => value =>
  (value && value.length !== size ? `Должно быть ровно ${size} символов` : undefined)

export const number = value =>
  (value && Number.isNaN(Number(value)) ? 'Должно быть число' : undefined)

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Невалидный email адрес'
    : undefined)

export const alphaNumeric = value =>
  (value && /[^a-zA-Z0-9]/i.test(value)
    ? 'Должны быть только английские буквы и цифры'
    : undefined)

export const russianName = value =>
  (value && /[^а-яА-ЯЁё]/i.test(value)
    ? 'Должны быть только символы русского алфавита без пробелов'
    : undefined)

export const minLength2 = minLength(2)
export const minLength8 = minLength(8)
export const maxLength10 = maxLength(10)
export const maxLength30 = maxLength(30)
export const length10 = length(10)

export default {}
