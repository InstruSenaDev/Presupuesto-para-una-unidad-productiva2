import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fpzrttavkfpjrzgjoivb.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const fecha = document.getElementById('fecha').value;
    const descripcion = document.getElementById('descripcion').value;
    const valor = document.getElementById('valor').value
   
    // Inserta los datos en la tabla "productos"
    const { data, error } = await supabase
      .from('presupuesto')
      .insert([
        { fecha: fecha }
      ])
  
    if (error) {
      console.error('Error al insertar datos:', error.message);
      alert('Hubo un error al guardar el producto.');
    } else {
      console.log('Producto guardado:', data);
      alert('Producto guardado exitosamente!');
      
      // Opcional: Cierra el modal y limpia el formulario después de enviar los datos
      modal.classList.add('hidden');
      e.target.reset();
    }
  });
  