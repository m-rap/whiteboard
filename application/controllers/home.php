<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }
    
    public function regex_check($str) {
        if (1 !== preg_match("/^[a-zA-Z0-9\s]+$/", $str)) {
            $this->form_validation->set_message('regex_check', 'The %s field is not valid!');
            return false;
        } else {
            return true;
        }
    }
    
    public function index() {
        $this->load->model('roomModel');
        $this->load->library('form_validation');
        
        $roomName = '';
        $_POST['roomName'] = $this->input->get('roomName');
        $this->form_validation->set_rules('roomName', 'Room name', 'required|min_length[1]|callback_regex_check|trim');
        
        if ($this->form_validation->run() == false) {
            $this->load->view('home', array('roomName' => $roomName));
            return;
        }
        
        $roomName = $this->input->post('roomName');
        //$this->roomModel->Create($roomName);
        $this->load->view('home', array('roomName' => $roomName));
    }
    
    public function test() {
        
    }
}
