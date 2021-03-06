<?php

class Curl_Controller extends Controller {

	public $restful = true;
	
	function __construct()
	{
		$this->api_url = Config::get('application.api_url');
	}

	function get_index()
	{
		$data = Input::all();

		if (empty($data['controller'])) {
			return 'Please enter some parameters for the GET request';
		}
		else {
			$controller = $data['controller'];
			$id = $data['id'];

			$url = $this->api_url . '/' . $controller . '/' . $id;

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_URL, $url);

			$result = curl_exec($ch);
			curl_close($ch);

			return $result;
		}
	}

	function post_index()
	{
		$data = Input::all();

		if (empty($data['controller'])) {
			return 'Please supply data for the POST request';
		}
		else {
			$controller = $data['controller'];
			$url = $this->api_url . '/' . $controller;

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_URL, $url);

			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	  		$result = curl_exec($ch);
	  		curl_close($ch);

	  		return $result;
		}
	}

	function put_index()
	{
		//PUT example adapted from: http://www.php.net/manual/en/function.curl-setopt.php#96056

		$data = Input::all();

		if (empty($data['controller'])) {
			return 'Please supply data for the PUT request';
		}
		else {
			$data_string = http_build_query($data);
			$controller = $data['controller'];
			$url = $this->api_url . '/' . $controller;

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Length: ' . strlen($data_string)));
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
			curl_setopt($ch, CURLOPT_URL, $url);
			$result = curl_exec($ch);

			$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			curl_close($ch);

			return $result;
		}
	}

	function delete_index()
	{
		$data = Input::all();
		$data['id'] = 2;

		if (empty($data['controller'])) {
			return 'Please enter some parameters for the DELETE request';
		}
		else {
			$data_string = http_build_query($data);
			$controller = $data['controller'];
			$id = $data['id'];
			$url = $this->api_url . '/' . $controller . '/' . $id;

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE	');
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Length: ' . strlen($data_string)));
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
			curl_setopt($ch, CURLOPT_URL, $url);
			$result = curl_exec($ch);

			$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			curl_close($ch);

			return $result;
		}
	}

}
