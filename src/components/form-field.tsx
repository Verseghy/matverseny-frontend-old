import { Field, FieldProps, ErrorMessage } from 'formik'
import React from 'react'
import { Input, InputProps } from './input'
import styles from '../styles/form-field.module.scss'
import classnames from 'classnames'

export interface FormFieldProps extends InputProps {
  name: string
  display?: string
  className?: string
}

export const FormField: React.VFC<FormFieldProps> = ({ name, display, className, ...rest }) => {
  const classes = classnames(styles.field, className)

  return (
    <label className={classes}>
      {display && <span>{display}</span>}
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <Input block {...rest} {...field} error={!!meta.touched && !!meta.error} />
        )}
      </Field>
      <ErrorMessage name={name}>
        {(message) => <span className={styles.error}>{message}</span>}
      </ErrorMessage>
    </label>
  )
}
