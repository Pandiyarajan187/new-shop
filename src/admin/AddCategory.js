import React , { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/authContext'

function AddCategory() {
  const { addCategory } = useContext(authContext)
  const validationArray = Yup.object().shape({
    category: Yup.string().min(6).required('Email is Required'),
})

const formik = useFormik({
    initialValues: {
        category: '',
    },
    validationSchema: validationArray,
    onSubmit: async (values) => {
        console.log(values);
        addCategory(values)
    }
})
  const CategoryForm = (
                    <form className='needs-validation' onSubmit={formik.handleSubmit} noValidate>
                        <p className="h4 text-center py-4">Create Category</p>
                        <div className="grey-text">
                        <input
                            className="mb-3"
                            outline
                            name="name"
                            label="Category Name"
                            icon="tag"
                            group
                            type="text"
                            validate
                            error="wrong"
                            required
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            autoFocus
                        >
                               <div className='text-danger'>
                                                {formik.touched.category ? formik.errors.category : null}
                                            </div>
                        </input>
                        </div>
                        <div className="text-center py-4 mt-3">
                            <button color="cyan" type="submit">
                                create
                            </button>
                        </div>
                    </form>
)

return (
    <div>
        { CategoryForm }
    </div>
)
}

export default AddCategory