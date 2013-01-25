package com.justc0de.imagepuzzle;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;

@SuppressWarnings("serial")
public class TopTimes extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		if (request.getParameter("operation").compareTo("getTopTimes") == 0){
			
			getTopTimes(response);
			
		}else if(request.getParameter("operation").compareTo("compareUsersTime") == 0){
			
			compareUsersTime(
					response, 
					new TimeEntry(
							Integer.parseInt(request.getParameter("gridSize")),
							request.getParameter("usersName"),
							new Date(Long.parseLong(request.getParameter("usersTime")))));
		}
	}
	
	private void getTopTimes(HttpServletResponse response){
		
		try {
			//get latest times from storage then write back to requesting doc
			DataStorage connection = new GAEDataStoreOperations();
			List<TimeEntry> topTimes = connection.getTopTimes();
			
			// TODO results need to be formatted correctly
			String results = "";
			for (TimeEntry timeEntry: topTimes){
				results += "Grid size: " + timeEntry.getGridSize() +
	        			", Users name: " + timeEntry.getUsersName() +
	        			", Users time: " + timeEntry.getUsersTime().getTime() + "<br/>";
			}
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			out.write(results);

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
	
	private void compareUsersTime(HttpServletResponse response, TimeEntry timeEntry){
		
		// TODO logic to determine if time is faster then stored time
		// this is only debug code to save all times
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key topTimesKey = KeyFactory.createKey("TopTimes", "times");

        Entity timeEntity = new Entity("TimeEntry", topTimesKey);
        timeEntity.setProperty("gridSize", timeEntry.getGridSize());
        timeEntity.setProperty("usersName", timeEntry.getUsersName());
        timeEntity.setProperty("usersTime", timeEntry.getUsersTime());

        datastore.put(timeEntity);
		
		try {
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			
			/*
			 * check if users time was quicker then time stored , if so, update stored data
			 * 
			 * DataStorage connection = new GAEDataStoreOperations();
			 * 
			 * if (connection.getTopTimeForGridSize(timeEntry.getGridSize()).getTime() < 
			 *     timeEntry.getUsersTime().getTime()){
			 *         connection.setTopTimeForGridSize(timeEntry);
			 * }
			 */

			out.write("Saved to storage");

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
}