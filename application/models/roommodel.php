<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class RoomModel extends CI_Model {
    
    public function __construct() {
    }
    
    public function Create($roomName) {
        $path = $this->GetDirPath($roomName);
        if (!is_dir($path))
            mkdir($path);
        return $path;
    }
    
    public function GetDirPath($roomName) {
        return FCPATH . "data/$roomName";
    }
    
    public function Save($roomName, $data) {
        $path = $this->GetDirPath($roomName) . '/data';
        @file_put_contents($path, json_encode($data));
        return $this->IncrementVersion($roomName);
    }
    
    public function Load($roomName, $version) {
        $path = $this->GetDirPath($roomName) . '/data';
        $currentVersion = $this->GetVersion($roomName);
        if ($currentVersion == $version) {
            return false;
        }
        $data = json_decode(@file_get_contents($path));
        $data->version = $currentVersion;
        return json_encode($data);
    }
    
    public function GetVersion($roomName) {
        $path = $this->GetDirPath($roomName) . '/version';
        $version = @file_get_contents($path);
        if ($version == '')
            $version = 0;
        return $version;
    }
    
    public function IncrementVersion($roomName) {
        $version = intval($this->GetVersion($roomName));
        $version++;
        $path = $this->GetDirPath($roomName) . '/version';
        @file_put_contents($path, $version);
        return $version;
    }
}