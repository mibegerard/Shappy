import * as yup from 'yup';

const producteurValidationSchema = yup.object().shape({
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom est requis'),
  phoneNumber: yup.string().required('Le numéro de téléphone est requis'),
  postalCode: yup.string().required('Le code postal est requis'),
  city: yup.string().required('La ville est requise'),
  products: Yup.array().min(1, 'Au moins un aliment doit être sélectionné')
});

export {
  producteurValidationSchema
}
