'use server'
import axios from 'axios';

export default async function submitForm(formData: FormData) {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await axios.post('http://localhost:4000/api/signup', {
    username,
    email,
    password
  });

    if (response) {
        return {
        success: true,
        message: 'User created successfully'
        }
    }
    else{
        return {
        success: false,
        message: 'User creation failed'
        }
    }
}