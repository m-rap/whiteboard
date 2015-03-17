<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Room extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('roomModel');
    }
    
    public function save($roomName) {
        header('Access-Control-Allow-Origin: *');
        echo $this->roomModel->Save($roomName, $this->input->post());
    }
    
    public function load($roomName, $version) {
        header('Access-Control-Allow-Origin: *');
        echo $this->roomModel->Load($roomName, $version);
    }
}