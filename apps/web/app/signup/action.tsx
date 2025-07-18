'use server'
import  {redirect}  from 'next/navigation';
import axios from 'axios';

export default async function submitForm(formData: FormData) {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await axios.post('http://localhost:4173/signup', {
    username,
    email,
    password
  });

  redirect("/signin")
}
