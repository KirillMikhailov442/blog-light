import styles from './Newsletter.module.scss';

import { IoSend } from 'react-icons/io5';
import { IoIosCloseCircle } from 'react-icons/io';
import Input from '@components/UI/Input/Input';
import Button from '@UI/Button/Button';
import { useCallback, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Newsletter = () => {
  const [subscriber, setSubscriber] = useState(
    localStorage.getItem('email_id') ? true : false,
  );
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Некорекктный e-mail')
        .required('Введите e-mail'),
    }),
    onSubmit: async (values, { resetForm, setErrors }) => {
      if (!loading) {
        await setLoading(true);
        await axios
          .post('http://localhost:8000/api/v1/subscribers/', values)
          .then(res => {
            setSubscriber(true);
            localStorage.setItem('email_id', String(res.data.id));
            resetForm();
          })
          .catch(err =>
            setErrors({
              email: err.response.data.email,
            }),
          )
          .finally(() => setLoading(false));
      }
    },
  });

  const unsubscribe = useCallback(async () => {
    setLoading(true);
    const emailId = localStorage.getItem('email_id');
    localStorage.removeItem('email_id');
    axios
      .delete(`http://localhost:8000/api/v1/subscribers/${emailId}`)
      .then(() => setSubscriber(false))
      .finally(() => setLoading(false));
  }, []);

  if (!subscriber) {
    return (
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Подписка на рассылку</h1>
        <div className={styles.group}>
          <Input
            handleChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            placeholder="Email@gmail.com"
            name="email"
            error={formik.errors.email}
          />
          {!loading && (
            <Button className={styles.button} type="submit">
              Подписаться <IoSend className="ml-2 text-lg" />
            </Button>
          )}
          {loading && (
            <Button className={styles.button} variant="sky">
              <CircularProgress />
            </Button>
          )}
        </div>
      </form>
    );
  }
  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Подписка на рассылку</h1>
      <p className={styles.subscribeText}>Вы подписаны</p>
      {!loading && (
        <Button
          handleClick={() => unsubscribe()}
          className={styles.button}
          variant="sky"
          type="submit"
        >
          Отказаться <IoIosCloseCircle className="ml-2 text-lg" />
        </Button>
      )}
      {loading && (
        <Button className={styles.button} variant="sky">
          <CircularProgress />
        </Button>
      )}
    </div>
  );
};

export default Newsletter;
