import { createClient } from '@supabase/supabase-js'

// Asegúrate de que VITE_SUPABASE_KEY esté configurado en tus variables de entorno
const supabaseUrl = import.meta.env.supabaseUrl;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("Buscador");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe por defecto
  console.log("evento enviado");

  // Obtener los valores del formulario
  const buscar = document.getElementById("Buscar").value;

  // Buscar usuarios que coincidan con el nombre o documento
  try {
    console.log("preparando solicitud");
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .or(`nombre.ilike.%${buscar}%, documento.ilike.%${buscar}%`);
    
    console.log("busqueda enviada");

    if (error) {
      console.error("Error al buscar usuarios:", error);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
});
