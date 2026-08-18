import { useEffect } from "react";
import { supabase } from "../config/supabase";

export function useRealtime(setData, tableName) {

  useEffect(() => {

    var channelName = tableName.concat('-channel');
    
    const loadData = async () => {
      const { data, error } = await supabase.from(tableName).select();
      if (error) {
        console.log(error);
        return;
      }
      if (data)
        setData(data);
    }

    loadData();

    const channel = supabase
      .channel(channelName) 
      .on(
        'postgres_changes',
        { 
          event: '*',
          schema: 'public', 
          table: tableName 
        },
        (payload) => { loadData(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, setData]); 
}