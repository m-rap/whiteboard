<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Whiteboard</title>
        <script type="text/javascript" src="<?php echo base_url(); ?>static/js/jquery-1.8.2.min.js"></script>
        <script type="text/javascript">
            
            //event setelah page selesai di-load
            $(document).ready(function() {
                
                //event element dropdown_provinsi saat value-nya dirubah
                $('#dropdown_provinsi').change(function() {
                
                    //kirim request ajax ke http://dev.mrap.web.id/whiteboard/test/get_kota/[id_provinsi]
                    //[id_provinsi] bisa didapat dengan fungsi $('#dropdown_provinsi').val()
                    //referensi fungsi http://api.jquery.com/jQuery.get/
                    //jQuery.get( url [, data ] [, success(data, textStatus, jqXHR) ] [, dataType ] )
                    $.get('<?php echo site_url('test/get_kota'); ?>/' + $('#dropdown_provinsi').val(), function(data) {

                        //data adalah response dari webserver, data ini diolah jadi element option
                        var options = '';
                        for (i in data) {
                            options += '<option value="' + i + '">' + data[i] + '</option>';
                        }
                        
                        //options diletakkan didalam node element dropdown_kota
                        $('#dropdown_kota').html(options);
                    }, 'json');
                });
                
                //nanti kalo mau nambah kecamatan tinggal tambahin event, trus eventnya kirim request ajax ke url yg kasih response data kecamatan
            });
        </script>
    </head>
    <body>
        <div style="background-color: red;">r</div>
        <div style="background-color: green;">g</div>
        <div style="background-color: blue;">b</div>
        <?php echo form_open('test'); ?> 
        <?php echo form_dropdown('input_provinsi', $provinsi, 0, 'id="dropdown_provinsi"'); ?> 
        <?php echo form_dropdown('input_kota', $kota, 0, 'id="dropdown_kota"'); ?> 
        <?php echo form_close(); ?> 
    </body>
</html>