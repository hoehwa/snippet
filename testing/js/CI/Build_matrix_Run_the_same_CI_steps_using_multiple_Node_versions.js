/* Build matrix Run the same CI steps using multiple Node versions */

/**
 * ✅Do
 * Quality checking is about serendipity, the more ground you cover the luckier you get in detecting issues early. 
 * When developing reusable packages or running a multi-customer production with various configuration and Node versions, 
 * the CI must run the pipeline of tests over all the permutations of configurations. 
 * 
 * For example, assuming we use MySQL for some customers and Postgres for others — some CI vendors support a feature called ‘Matrix’ which allow running the suit of testing against all permutations of MySQL, Postgres and multiple Node version like 8, 9 and 10. 
 * 
 * This is done using configuration only without any additional effort (assuming you have testing or any other quality checks). Other CIs who doesn’t support Matrix might have extensions or tweaks to allow that
 */

/**
 * ❌ Otherwise
 * So after doing all that hard work of writing testing are we going to let bugs sneak in only because of configuration issues?
 */


// Example: Using Travis (CI vendor) build definition 
//          to run the same test over multiple Node versions

```
language: node_js
node_js:
  - "7"
  - "6"
  - "5"
  - "4"
install:
  - npm install
script:
  - npm run test
```