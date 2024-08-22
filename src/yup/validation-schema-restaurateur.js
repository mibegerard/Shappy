import * as yup from 'yup';

const restaurateurValidationSchema = yup.object().shape({
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom est requis'),
  phoneNumber: yup.string().required('Le numéro de téléphone est requis'),
  restaurantName: yup.string().required('Le nom du restaurant est requis'),
  restaurantAddress: yup.string().required('L\'adresse du restaurant est requise'),
  postalCode: yup.string().required('Le code postal est requis'),
  city: yup.string().required('La ville est requise'),
});

export {
  restaurateurValidationSchema
}
