import Swal from 'sweetalert2'
export const Popup = () => {
}

export const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    showCloseButton: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})