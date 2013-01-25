package com.justc0de.imagepuzzle;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;

public class GAEDataStoreOperations implements DataStorage {

	public List<TimeEntry> getTopTimes() {
		
		List<TimeEntry> topTimes = new ArrayList<TimeEntry>();
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key topTimesKey = KeyFactory.createKey("TopTimes", "times");
		
	    Query query = new Query("TimeEntry", topTimesKey);
	    List<Entity> timeEntries = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(8));
	    
	    for (Entity timeEntry: timeEntries){
	    	topTimes.add(new TimeEntry(
	    			Integer.parseInt(String.valueOf(timeEntry.getProperty("gridSize"))),
	    			String.valueOf(timeEntry.getProperty("usersName")),
	    			(Date) timeEntry.getProperty("usersTime")));
	    }
        
		return topTimes;
	}

	public Date getTopTimeForGridSize(int gridSize) {
		// TODO query DataStore for TopTimeEntry Entity for particular gridSize
		
		return null;
	}

	public void setTopTimeForGridSize(TimeEntry timeEntry) {
		//TODO update DataStore TopTimeEntry Entity for particular gridSize
	}
}