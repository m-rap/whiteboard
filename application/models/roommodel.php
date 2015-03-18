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
        $version = intval($this->GetVersion($roomName));
        $version++;
        $path = $this->GetDirPath($roomName) . "/$version";
        @file_put_contents($path, json_encode($data));
        return $this->IncrementVersion($roomName);
    }
    
    public function Load($roomName, $version) {
        $path = $this->GetDirPath($roomName);
        $currentVersion = intval($this->GetVersion($roomName));
        
        if ($currentVersion == $version) {
            return false;
        }
        
        $clientVersion = intval($version);
        $data = array(
            'sheets' => array(
                0 => array(
                    'id' => 0,
                    'lines' => array()
                ),
            )
        );
        
        for ($i = $clientVersion + 1; $i <= $currentVersion; $i++) {
            $temp = json_decode(@file_get_contents("$path/$i"));
            
            if (!isset($temp->sheets))
                continue;
            
            foreach ($temp->sheets as $tempEl) {
                if (!isset($tempEl->id) || !isset($tempEl->lines))
                    continue;
                
                foreach ($data['sheets'] as $key => $datum) {
                    if ($datum['id'] == $tempEl->id) {                        
                        foreach ($tempEl->lines as $tempLine) {
                            $data['sheets'][$key]['lines'][] = $tempLine;
                        }
                    }
                }
            }
        }
        $data['version'] = $currentVersion;
        
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