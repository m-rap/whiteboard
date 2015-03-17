<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Script extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }
    
    public function index() {
        header('Content-Type: text/javascript');
        $this->TraverseScript(FCPATH . 'static/js/pattern/');
    }
    
    private function TraverseScript($dir) {
        $files = @scandir($dir);
        foreach ($files as $f) {
            $path = $dir . $f;
            if ($f == '.' || $f == '..') continue;
            if (@is_dir($f))
                $this->TraverseScript($path . '/');
            else
                echo @file_get_contents($path) . "\n\n";
        }
    }
}