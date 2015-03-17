<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }
    
    //halaman form http://dev.mrap.web.id/whiteboard/test/
    public function index() {
        $this->load->helper('form');
        
        //di bawah ini ganti query provinsi dari database trus masukin ke array dengan format seperti ini
        $provinsi = array(
            0 => '- Pilih Provinsi -',
            1 => 'Jawa Timur',
            2 => 'Jawa Tengah'
        );
        $kota = array(
            0 => '- Pilih Kota -'
        );
        $data = array(
            'provinsi' => $provinsi,
            'kota' => $kota
        );
        
        //nampilin halaman ke client dengan data hasil query
        $this->load->view('test_view', $data);
    }
    
    //data json kota http://dev.mrap.web.id/whiteboard/test/get_kota/[id_provinsi]
    public function get_kota($provinsi) {
        $kota = array(
            0 => '- Pilih Kota -'
        );
        
        //di bawah ini ganti query kota dari database, trus masukin ke array dengan format seperti ini
        if ($provinsi == '1') {
            $kota = array(
                0 => '- Pilih Kota -',
                1 => 'Surabaya',
                2 => 'Malang'
            );
        } else if ($provinsi == '2') {
            $kota = array(
                0 => '- Pilih Kota -',
                1 => 'Semarang',
                2 => 'Solo'
            );
        }
        
        //panggil fungsi json_encode buat convert array ke notasi json, trus di-echo sebagai html response ke client
        echo json_encode($kota);
    }
    
    //di sini tambahin fungsi lain buat query data yang diperlukan
    
    
    public function getcontents() {
        //echo file_get_contents('http://google.com');
    }
    
    public function ip() {
        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];
        $result  = "Unknown";
        if(filter_var($client, FILTER_VALIDATE_IP)) {
            $ip = $client;
        } else if(filter_var($forward, FILTER_VALIDATE_IP)) {
            $ip = $forward;
        } else {
            $ip = $remote;
        }
        
        $contents = file_get_contents("http://ipinfo.io/".$ip."/json");//http://www.geoplugin.net/php.gp?ip=
        
        if ($contents === false) {
            echo "Error";
            return;
        }
        
        //$contents = unserialize($contents);
        
        echo "$contents\r\n";
        return;

        $ip_data = @json_decode($contents);

        if($ip_data && $ip_data->geoplugin_countryName != null) {
            $result = $ip_data->geoplugin_countryName;
        }

        echo $result;
    }
}