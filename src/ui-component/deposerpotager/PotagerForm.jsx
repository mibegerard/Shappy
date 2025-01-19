import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    NativeSelect,
    IconButton,
    Divider,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const PotagerForm = () => {
    const theme = useTheme();
    const navigate = useNavigate(); // Initialize navigate
    const productInitialValues = {
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: '1',
        unit: '',
        image: null
    };

    const productValidationSchema = yup.object().shape({
        name: yup.string().required('Le nom est obligatoire'),
        description: yup.string().required('La description est obligatoire'),
        price: yup.number().required('Le prix est obligatoire').positive('Le prix doit être positif').typeError('Le prix doit être un nombre'),
        category: yup.string().required('La catégorie est obligatoire'),
        quantity: yup.number().required("La quantité est obligatoire").min(1, "La quantité ne peut pas être négative"),
        unit: yup.string().required("L'unité est obligatoire"),
        image: yup.mixed().required("L'image est obligatoire")
    });

    const [quantity, setQuantity] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(productValidationSchema),
        defaultValues: productInitialValues
    });

    const price = watch('price', 0.00);

    const onSubmit = async (data) => {
        data.price = parseFloat(data.price).toFixed(2);
        navigate('/product-review', { state: { formData: data } });
    };
    

    const handleQuantityIncrease = () => {
        setQuantity(prevQuantity => {
            const newQuantity = Math.min(prevQuantity + 1, 50);
            setValue('quantity', newQuantity);  // Update the form value
            return newQuantity;
        });
    };
    
    const handleQuantityDecrease = () => {
        setQuantity(prevQuantity => {
            const newQuantity = Math.max(prevQuantity - 1, 1);
            setValue('quantity', newQuantity);  // Update the form value
            return newQuantity;
        });
    };    

    const handlePriceIncrease = () => {
        const newPrice = parseFloat((parseFloat(price) + 0.01).toFixed(2));
        console.log('Increased price to:', newPrice);
        setValue('price', newPrice);  // Update form value
    };

    const handlePriceDecrease = () => {
        const newPrice = parseFloat((Math.max(parseFloat(price) - 0.01, 0).toFixed(2)));
        console.log('Decreased price to:', newPrice);
        setValue('price', newPrice);  // Update form value
    };

    const handlePriceChange = (event) => {
        const newPrice = event.target.value;
        console.log('Price changed to:', newPrice);
        setValue('price', newPrice);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate image type
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                toast.error("Seules les images JPEG et PNG sont acceptées");
                return;
            }
            console.log('Image selected:', file);
            setValue('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Box
                    sx={{
                        width: '100%',
                        margin: 'auto',
                        height: imagePreview
                            ? { xs: '40vh', md: '50vh' } 
                            : '30vh', 
                        mt: 5,
                        mb: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: 'transparent',
                        backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center', 
                        backgroundRepeat: 'no-repeat', 
                         border: `1px solid #385909`
                    }}
                >
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Selected preview"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    )}
                    {!imagePreview && ( // Conditionally render the button if no image is selected
                        <Button
                            variant="contained"
                            startIcon={<CameraAltIcon />}
                            component="label"
                            sx={{ position: 'absolute', zIndex: 10, backgroundColor: '#385909' }}
                        >
                            Je prends une photo
                            <input
                                type="file"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                    )}
                    {errors.image && (
                        <Typography color="error" sx={{ position: 'absolute', bottom: 0 }}>
                            {errors.image.message}
                        </Typography>
                    )}
                </Box>
                {imagePreview && (
                    // Conditionally render the button if no image is selected
                    <Button
                        variant="contained"
                        startIcon={<CameraAltIcon />}
                        component="label"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '20px auto', // Top and bottom margin of 20px, horizontally centered
                            backgroundColor: '#385909',
                            zIndex: 10,
                            position: 'relative', // Adjust positioning for centering
                        }}
                    >
                        Je prends une photo
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                )}
                {errors.image && (
                    <Typography color="error" sx={{ position: 'absolute', bottom: 0 }}>
                        {errors.image.message}
                    </Typography>
                )}

                <Box
                    sx={{
                        width: '100%',
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '10px',
                        border: '1px solid #385909',
                        padding: { xs: 1, sm: 1, md: 1, lg: 4, xl: 4 }
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }, flex: 1 }}>
                        <Typography variant="body1" sx={{ color: '#385909' }}>Nom du Produit</Typography>
                        <Typography variant="body1" sx={{ color: '#385909' }}>Description du Produit</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 2 }}>
                        <TextField
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                sx: { borderBottom: '1px solid #385909', width: '100%' }
                            }}
                            {...register('name')}
                        />
                        {errors.name && <Typography color="error">{errors.name.message}</Typography>}
                        <TextField
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                sx: { borderBottom: '1px solid #385909', width: '100%' }
                            }}
                            {...register('description')}
                        />
                        {errors.description && <Typography color="error">{errors.description.message}</Typography>}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 8,
                        mb: 8,
                        borderRadius: '10px',
                        border: '1px solid #385909',
                        padding: 2
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ color: '#385909' }}>Catégorie</Typography>
                    </Box>
                    <Box sx={{ flex: 2 }}>
                        <NativeSelect
                            defaultValue=""
                            onChange={(e) => {
                                setValue('category', e.target.value);
                                console.log('Category selected:', e.target.value);
                            }}
                            inputProps={{ name: 'category' }}
                            sx={{ borderBottom: '1px solid #385909', pt: 0.7, pb: 0.7, width: '100%' }}
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Légumes">Légumes</option>
                        </NativeSelect>
                        {errors.category && <Typography color="error">{errors.category.message}</Typography>}
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: {
                            xs: 'column', // small screens
                            md: 'row',    // medium screens and up
                        },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 8,
                        mb: 8,
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #385909',
                            borderRadius: '8px',
                            height: '80px',
                            width: '100%',
                            padding: 2,
                            marginBottom: { xs: 2, md: 0 }, // Add margin bottom for small screens
                            marginRight: { md: 2 }, // Add margin right for medium screens and up
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="body1" sx={{ mr: 5, color: '#385909' }}>Unité de mesure</Typography>
                        <NativeSelect
                            defaultValue=""
                            onChange={(e) => {
                                setValue('unit', e.target.value);
                                console.log('Unit selected:', e.target.value);
                            }}
                            inputProps={{ name: 'unit' }}
                            sx={{ borderBottom: '1px solid #385909', pt: 0.7, pb: 0.7, width: '100%' }}
                        >
                            <option value="">Sélectionnez une unité</option>
                            <option value="KG">kg</option>
                            <option value="pièce">À la pièce</option>
                        </NativeSelect>
                        {errors.unit && <Typography color="error">{errors.unit.message}</Typography>}
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #385909',
                            borderRadius: '8px',
                            height: '80px',
                            width: '100%',
                            padding: 2,
                            justifyContent: 'space-between',
                            marginBottom: { xs: 2, md: 0 }, // Add margin bottom for small screens
                            marginRight: { md: 2 }, // Add margin right for medium screens and up
                        }}
                    >
                        <Typography variant="body1" sx={{ mr: 5, color: '#385909' }}>Quantité</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #385909',
                                borderRadius: '8px',
                                padding: 1,
                            }}
                        >
                            <IconButton onClick={handleQuantityDecrease} disabled={quantity === 0}>
                                <RemoveIcon />
                            </IconButton>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            <IconButton onClick={handleQuantityIncrease} disabled={quantity === 50}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #385909',
                            borderRadius: '8px',
                            height: '80px',
                            width: '100%',
                            padding: 2,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="body1" sx={{ mr: 2, color: '#385909' }}>Prix à l'unité</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #385909',
                                borderRadius: '8px',
                                padding: 1,
                            }}
                        >
                            <IconButton onClick={handlePriceDecrease} disabled={price <= 0}>
                                <RemoveIcon />
                            </IconButton>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            <TextField
                                variant="standard"
                                value={price}
                                onChange={handlePriceChange}
                                inputProps={{
                                    type: 'number',
                                    step: '0.01',
                                    min: '0',
                                }}
                                sx={{ width: '80px', textAlign: 'center' }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                }}
                            />
                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            <IconButton onClick={handlePriceIncrease}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        {errors.price && <Typography color="error">{errors.price.message}</Typography>}
                    </Box>
                </Box>


                <Box sx={{ mt: 2, mb:4, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: '70%', backgroundColor: '#385909', fontSize: '18px' }}
                        disabled={isSubmitting}
                        startIcon={isSubmitting && <CircularProgress size={24} color="inherit" />}
                    >
                        {isSubmitting ? 'Loading...' : 'Créer le produit'}
                    </Button>
                </Box>
            </Container>
        </form>
    );
};

export default PotagerForm;
