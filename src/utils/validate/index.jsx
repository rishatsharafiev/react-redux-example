export const required = value => (value ? undefined : 'Обязательное поле')

export const maxLength = max => value =>
  (value && value.length > max ? `Должно быть ${max} символов или менее` : undefined)

export const minLength = min => value =>
  (value && value.length < min ? `Должно быть ${min} символов или более` : undefined)

export const number = value =>
  (value && Number.isNaN(Number(value)) ? 'Должно быть число' : undefined)

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Невалидный email адрес'
    : undefined)

export const alphaNumeric = value =>
  (value && /[^a-zA-Z0-9]/i.test(value)
    ? 'Должны быть только буквы и цифры'
    : undefined)

export const russianName = value =>
  (value && /[^а-яА-ЯЁё]/i.test(value)
    ? 'Должны быть только символы русского алфавита без пробелов'
    : undefined)

export const minLength2 = minLength(2)
export const minLength8 = minLength(8)
export const maxLength30 = maxLength(30)

export default {}
