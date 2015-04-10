<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Whiteboard</title>
        
        <!--<script type="text/javascript" src="<?php echo base_url(); ?>static/js/jquery-1.8.2.min.js"></script>-->
        
        <link href="<?php echo base_url(); ?>ext/Flat-UI/dist/css/vendor/bootstrap.min.css" rel="stylesheet">
        <link href="<?php echo base_url(); ?>ext/Flat-UI/dist/css/flat-ui.min.css" rel="stylesheet">
        <script type="text/javascript" src="<?php echo base_url(); ?>ext/Flat-UI/dist/js/vendor/jquery.min.js"></script>
        
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>static/css/style.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>static/css/popup.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>static/css/colorpicker.css" />
        <script type="text/javascript" src="<?php echo base_url(); ?>static/js/helper.js"></script>
        <script type="text/javascript" src="<?php echo site_url('script'); ?>"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>static/js/popup.js"></script>
        <script type="text/javascript" src="http://whiteboard-backend-nodejs-m-rap.c9.io/socket.io/socket.io.js"></script>
        <script type="text/javascript">
            var trueModel;
            var whiteBoard1;
            var colorPicker;
            function ChangeState(state) {
                $('#toolbox a.active').removeClass('active');
                whiteBoard1.currentState = whiteBoard1.stateManager[state];
                $('a#' + state).addClass('active');
                return false;
            }
            $(document).ready(function() {
                var promptRoomName = true;
                <?php
                if ($roomName == '') {
                    echo 'centerPopup();loadPopup();';
                } else {
                    echo 'promptRoomName = false;';
                }
                ?> 
                if (!promptRoomName) {
                    trueModel = new TrueModel();
                    trueModel.saveUrl = '<?php echo site_url("room/save/$roomName"); ?>';
                    trueModel.loadUrl = '<?php echo site_url("room/load/$roomName"); ?>';
                    trueModel.roomName = '<?php echo $roomName; ?>';
                    whiteBoard1 = new WhiteBoard('whiteboard-main', 'whiteboard-helper');
                    whiteBoard1.model = trueModel.sheets[0];
                    whiteBoard1.trueModel = trueModel;
                    trueModel.sheets[0].Attach(whiteBoard1);
                    //trueModel.StartAutoUpdate();
                    trueModel.StartSocketIO();
                    $('a#' + whiteBoard1.currentState.name).addClass('active');
                    colorPicker = new ColorPicker('colorPicker', new Palette('palette'), new HueBar('hueBar'), whiteBoard1, 'colorButton');
                }
            });
        </script>
        
        
    </head>
    <body>		
        <div id="backgroundPopup"></div>
        <div id="container">
            <h3 id="title">Whiteboard</h3>
            <div id="toolbox" class="btn-group">
                <a href="" id="pencilState" onclick="return ChangeState('pencilState');" class="btn btn-primary">Pencil</a>
                <a href="" id="lineState" onclick="return ChangeState('lineState');" class="btn btn-primary">Line</a>
                <a href="" id="colorButton" class="btn btn-primary">
                    <div>Color</div>
                    <div id="activeColor"></div>
                </a>
            </div>
            <a id="github" href="https://github.com/m-rap/whiteboard">GitHub</a>
            <div id="whiteboard-container">
				<canvas id="whiteboard-main" class="whiteboard" width="1000" height="550"></canvas>
				<canvas id="whiteboard-helper" class="whiteboard-helper" width="1000" height="550"></canvas>
			</div>
            <div id="footer" class="footer">
				Theme by <a href="http://designmodo.github.io/Flat-UI/docs/getting-started.html">Flat-UI</a>
            </div>
        </div>
        
        <div id="colorPicker">
			<div class="colorPicker">
				<div id="palette" class="wb-palette">
					<div class="innerPalette">
						<div class="paletteHandle"></div>
					</div>
				</div>
				<div id="hueBar" class="hueBar">
					<div class="hueBarHandle"></div>
				</div>
			</div>
		</div>
        
        <div id="popupContact">
            <h6>Whiteboard</h6>
            Please insert room name.
            <form action="<?php echo site_url(); ?>" method="get">
                <table>
                    <tr>
                        <td>Name:</td>
                        <td><input type="text" name="roomName" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="text-align: right;"><input type="submit" name="submit" value="Submit" /></td>
                    </tr>
                </table>
            </form>
        </div>
    </body>
</html>
