<?php

 class Config {

  public static function DB_HOST(){
    return Config::get_env("DB_HOST", "db-mysql-fra1-04022-do-user-11561120-0.b.db.ondigitalocean.com");
  }
  public static function DB_USERNAME(){
    return Config::get_env("DB_USERNAME", "doadmin");
  }
  public static function DB_PASSWORD(){
    return Config::get_env("DB_PASSWORD", "AVNS_Qx0d-JOQC-WXwcegmAT");
  }
  public static function DB_SCHEME(){
    return Config::get_env("DB_SCHEME", "studentinformationsystem");
  }
  public static function DB_PORT(){
    return Config::get_env("DB_PORT", "25060");
  }
  public static function JWT_SECRET(){
    return Config::get_env("JWT_SECRET", "ezcb9s8UcF");
  }

  public static function get_env($name, $default){
   return isset($_ENV[$name]) && trim($_ENV[$name]) != '' ? $_ENV[$name] : $default;
  }
}

?>
