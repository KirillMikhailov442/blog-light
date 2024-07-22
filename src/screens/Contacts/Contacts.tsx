'use client';

import styles from './Contacts.module.scss';

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiBoosty } from 'react-icons/si';
import { IoSend } from 'react-icons/io5';
import { BsFillTelephoneFill, BsGeoAltFill } from 'react-icons/bs';
import Input from '@UI/Input/Input';
import Button from '@UI/Button/Button';
import Textarea from '@UI/Textarea/Textarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { CircularProgress } from '@mui/material';

const ContactsScreen = () => {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Введите имя'),
      email: Yup.string()
        .trim()
        .email('Некорекктный e-mail')
        .required('Введите e-mail'),
      message: Yup.string().trim().required('Напишите что-нибудь'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!loading) {
        await setLoading(true);
        await axios
          .post('http://localhost:8000/api/v1/subscribers/contact/', values)
          .then(res => setIsSendEmail(true))
          .catch(err => notFound())
          .finally(() => setLoading(false));
        resetForm();
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.contactInfo}>
        <h1 className={styles.title}>Контактная информация</h1>
        <a className={styles.contactText} href="tel:798788787">
          <BsFillTelephoneFill />
          +7 (987) 887-87
        </a>
        <a className={styles.contactText} href="">
          <BsGeoAltFill />
          г. Санкт-Петербург, ул. Ленина, 9
        </a>
        <ul className={styles.socialMedia}>
          <li>
            <a className={styles.socialMediaItem} href="">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a className={styles.socialMediaItem} href="">
              <SiBoosty />
            </a>
          </li>
          <li>
            <a className={styles.socialMediaItem} href="">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a className={styles.socialMediaItem} href="">
              <FaTwitter />
            </a>
          </li>
        </ul>
      </div>
      {!isSendEmail && (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Напиши нам</h1>
          <Input
            handleChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Ваше имя"
            className={styles.input}
            name="name"
            error={formik.errors.name}
          />
          <Input
            handleChange={formik.handleChange}
            value={formik.values.email}
            placeholder="E-mail"
            type="email"
            className={styles.input}
            name="email"
            error={formik.errors.email}
          />
          <Textarea
            handleChange={formik.handleChange}
            value={formik.values.message}
            placeholder="Сообщение..."
            className={styles.textarea}
            name="message"
            error={formik.errors.message}
          />
          {!loading && (
            <Button className={styles.button} type="submit">
              Отправить
              <IoSend className="ml-2 text-lg" />
            </Button>
          )}
          {loading && (
            <Button className={styles.button} variant="sky">
              <CircularProgress />
            </Button>
          )}
        </form>
      )}
      {isSendEmail && (
        <div className={styles.form}>
          <h1 className={styles.title}>Вы успешно отравили сообщение</h1>
          <IoMdCheckmarkCircleOutline className={styles.check} />
          <Button handleClick={() => setIsSendEmail(false)}>
            Отправить снова
            <GrPowerReset className="mk-2 text-lg" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactsScreen;
