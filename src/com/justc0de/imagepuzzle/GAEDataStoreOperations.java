package com.justc0de.imagepuzzle;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Query;

public class GAEDataStoreOperations implements DataStorage {

	public List<TimeEntry> getTopTimes() {
		
		List<TimeEntry> topTimes = new ArrayList<TimeEntry>();
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		
	    Query query = new Query("TimeEntry");
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
		
		List<TimeEntry> topTimes = getTopTimes();

		for (TimeEntry timeEntry: topTimes){
			
			if (timeEntry.getGridSize() == gridSize){
				return timeEntry.getUsersTime();
			}
		}
		
		return new Date(new Date().getTime() - new Date().getTime());
	}

	public void setTopTimeForGridSize(TimeEntry timeEntry) {
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        Entity timeEntity = new Entity("TimeEntry", timeEntry.getGridSize());
        timeEntity.setProperty("gridSize", timeEntry.getGridSize());
        timeEntity.setProperty("usersName", timeEntry.getUsersName());
        timeEntity.setProperty("usersTime", timeEntry.getUsersTime());

        datastore.put(timeEntity);
	}
}