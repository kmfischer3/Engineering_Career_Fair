<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>


<?php 
/*
After this script runs, (assuming it's successful) the database will look like this:

mysql> select * from companies;
+----+-----------+-------------------+----------------+--------------+
| id | name      | email             | description    | website      |
+----+-----------+-------------------+----------------+--------------+
|  1 | Company A | user@companyA.com | lorem ipsum    | companyA.org |
|  2 | Company B | user@companyB.com | yadda yadda    | companyB.org |
|  3 | Company C | user@companyC.com | blah blah blah | companyC.org |
+----+-----------+-------------------+----------------+--------------+


mysql> select * from booths;
+----+----------+----------------+-----------------+
| id | location | mon_company_id | tues_company_id |
+----+----------+----------------+-----------------+
|  1 |      300 |              1 |               1 |
|  2 |      450 |              2 |               3 |
|  3 |      308 |              3 |               2 |
+----+----------+----------------+-----------------+

*/


  /* Set up JSON response */
  $response = array();
  $response["status_code"] = "_UNKNOWN";

  if (mysqli_connect_errno()) 
  {
      $response["status_code"] = "_SER";
  } 

  else 
  {
      $good_to_go = true; //stays true if ok to proceed with table creation/insertion

      // If booths table exists, it will have a few foreign keys linked to companies table.
      // => drop booths table first so truncating companies table will not cause SQLerror
      $drop_booths = "DROP TABLE IF EXISTS booths;";
      if ( !mysqli_query($connection, $drop_booths) ) {
          $response["status_code"] = "_SQL";
          $response["sql_msg"] = mysqli_error($connection)." @LINE: ".__LINE__;
          $good_to_go = false;
      }

      $truncate_companies = "TRUNCATE TABLE companies";
      if ( !mysqli_query($connection, $truncate_companies) ) {
          $response["status_code"] = "_SQL";
          $response["sql_msg"] = mysqli_error($connection)." @LINE: ".__LINE__;
          $good_to_go = false;
      }

      if ($good_to_go) {

          /* First, fill in the companies table with some dummy data
          Field Specs:
          +-------------+--------------+------+-----+---------+----------------+
          | Field       | Type         | Null | Key | Default | Extra          |
          +-------------+--------------+------+-----+---------+----------------+
          | id          | int(6)       | NO   | PRI | NULL    | auto_increment |
          | name        | varchar(30)  | NO   |     | NULL    |                |
          | email       | varchar(30)  | NO   |     | NULL    |                |
          | description | varchar(255) | YES  |     | NULL    |                |
          | website     | varchar(30)  | YES  |     | NULL    |                |
          +-------------+--------------+------+-----+---------+----------------+
          */

          $insert_companies =   "INSERT INTO companies (name, email, description, website)";
          $insert_companies .=  "VALUES ('Company A', 'user@companyA.com', 'lorem ipsum', 'companyA.org'), ";
          $insert_companies .=  "('Company B', 'user@companyB.com', 'yadda yadda', 'companyB.org'), ";
          $insert_companies .=  "('Company C', 'user@companyC.com', 'blah blah blah', 'companyC.org');";

          if ( !mysqli_query($connection, $insert_companies) ) {
              $response["status_code"] = "_SQL";
              $response["sql_msg"] = mysqli_error($connection)." @LINE: ".__LINE__;
          } else {

              // Then, create booths table
              $create_booths =  "create table booths (  ";
              $create_booths .= "id int(6) auto_increment not null, ";
              $create_booths .= "location int(6) not null, ";
              $create_booths .= "mon_company_id int(6) not null, ";
              $create_booths .= "tues_company_id int(6) not null, ";
              $create_booths .= "foreign key (mon_company_id) ";
              $create_booths .=     "references companies(id) on delete cascade, ";
              $create_booths .= "foreign key (tues_company_id) ";
              $create_booths .=     "references companies(id) on delete cascade, ";
              $create_booths .= "primary key (id) ";
              $create_booths .= ");";

              if ( !mysqli_query($connection, $create_booths) ) {
                  $response["status_code"] = "_SQL";
                  $response["sql_msg"] = mysqli_error($connection)." @LINE: ".__LINE__;
              } else {

                    /* Last, fill in the booths table with some dummy data linked to existing companies
                    Field Specs:
                    +-----------------+--------+------+-----+---------+----------------+
                    | Field           | Type   | Null | Key | Default | Extra          |
                    +-----------------+--------+------+-----+---------+----------------+
                    | id              | int(6) | NO   | PRI | NULL    | auto_increment |
                    | location        | int(6) | NO   |     | NULL    |                |
                    | mon_company_id  | int(6) | NO   | MUL | NULL    |                |
                    | tues_company_id | int(6) | NO   | MUL | NULL    |                |
                    +-----------------+--------+------+-----+---------+----------------+
                    */

                    $insert_booths =   "INSERT INTO booths (location, mon_company_id, tues_company_id)";
                    $insert_booths .=  "VALUES (300, 1, 1), (450, 2, 3), (308, 3, 2);";

                    if ( !mysqli_query($connection, $insert_booths) ) {
                        $response["status_code"] = "_SQL";
                        $response["sql_msg"] = mysqli_error($connection)." @LINE: ".__LINE__;
                    } else {
                        $response["status_code"] = "OK";
                    }
              }
          }
      }

  }

/* Output pretty JSON */
$json = json_encode($response, JSON_PRETTY_PRINT);
printf("<pre>%s</pre>", $json);

?>

