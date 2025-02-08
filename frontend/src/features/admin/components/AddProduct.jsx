import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../../products/ProductSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm, Controller } from "react-hook-form"
import { selectBrands } from '../../brands/BrandSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'

export const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm()

    const dispatch = useDispatch()
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const productAddStatus = useSelector(selectProductAddStatus)
    const navigate = useNavigate()
    const theme = useTheme()
    const is1100 = useMediaQuery(theme.breakpoints.down(1100))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    useEffect(() => {
        if (productAddStatus === 'fulfilled') {
            reset()
            toast.success("New product added successfully!")
            navigate("/admin/dashboard")
        } else if (productAddStatus === 'rejected') {
            toast.error("Error adding product, please try again later.")
        }
    }, [productAddStatus, reset, navigate])

    useEffect(() => {
        return () => {
            dispatch(resetProductAddStatus())
        }
    }, [dispatch])

    const handleAddProduct = (data) => {
        const newProduct = { 
            ...data, 
            images: [data.image0, data.image1, data.image2, data.image3] 
        }
        delete newProduct.image0
        delete newProduct.image1
        delete newProduct.image2
        delete newProduct.image3

        dispatch(addProductAsync(newProduct))
    }

    return (
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
            <Stack width={is1100 ? "100%" : "60rem"} rowGap={4} mt={is480 ? 4 : 6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}> 

                {/* Input Fields */}
                <Stack rowGap={3}>
                    {/* Title */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                        <TextField {...register("title", { required: 'Title is required' })} error={!!errors.title} helperText={errors.title?.message} />
                    </Stack> 

                    {/* Brand & Category */}
                    <Stack flexDirection={'row'} gap={2}>
                        {/* Brand */}
                        <FormControl fullWidth error={!!errors.brand}>
                            <InputLabel id="brand-selection">Brand</InputLabel>
                            <Controller
                                name="brand"
                                control={control}
                                rules={{ required: "Brand is required" }}
                                render={({ field }) => (
                                    <Select {...field} label="Brand">
                                        {brands.map((brand) => (
                                            <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        {/* Category */}
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel id="category-selection">Category</InputLabel>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <Select {...field} label="Category">
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Stack>

                    {/* Description */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Description</Typography>
                        <TextField 
                            multiline rows={4} 
                            {...register("description", { required: "Description is required" })} 
                            error={!!errors.description} helperText={errors.description?.message}
                        />
                    </Stack>

                    {/* Price & Discount */}
                    <Stack flexDirection={'row'} gap={2}>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400}  gutterBottom>Price</Typography>
                            <TextField type='number' 
                                {...register("price", { required: "Price is required" })} 
                                error={!!errors.price} helperText={errors.price?.message} 
                            />
                        </Stack>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400}  gutterBottom>Discount {is480 ? "%" : "Percentage"}</Typography>
                            <TextField type='number' 
                                {...register("discountPercentage", { required: "Discount percentage is required" })} 
                                error={!!errors.discountPercentage} helperText={errors.discountPercentage?.message} 
                            />
                        </Stack>
                    </Stack>

                    {/* Stock Quantity */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Stock Quantity</Typography>
                        <TextField type='number' 
                            {...register("stockQuantity", { required: "Stock Quantity is required" })} 
                            error={!!errors.stockQuantity} helperText={errors.stockQuantity?.message} 
                        />
                    </Stack>

                    {/* Thumbnail */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Thumbnail</Typography>
                        <TextField 
                            {...register("thumbnail", { required: "Thumbnail is required" })} 
                            error={!!errors.thumbnail} helperText={errors.thumbnail?.message} 
                        />
                    </Stack>

                    {/* Product Images */}
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Product Images</Typography>
                        <Stack rowGap={2}>
                            {[0, 1, 2, 3].map((index) => (
                                <TextField 
                                    key={index} 
                                    {...register(`image${index}`, { required: `Image ${index + 1} is required` })} 
                                    error={!!errors[`image${index}`]} 
                                    helperText={errors[`image${index}`]?.message} 
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>

                {/* Action Buttons */}
                <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2}>
                    <Button size={is480 ? 'medium' : 'large'} variant='contained' type='submit'>Add Product</Button>
                    <Button size={is480 ? 'medium' : 'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
                </Stack>

            </Stack>
        </Stack>
    )
}
